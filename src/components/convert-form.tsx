import { useState, useEffect } from "react";
import { api } from "../lib/axios";
import { Input } from "./input";
import { InputLabel } from "./input-label";
import { Select } from "./select";
import { InputLoader } from "./input-loader";

interface ConvertFormProps {
    initialLoaderSetter: (b: boolean) => void
}

export function ConvertForm({ initialLoaderSetter }: ConvertFormProps) {
    const [currencies, setCurrencies] = useState<string[]>([])
    const [value, setValue] = useState(0)
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [output, setOutput] = useState("Type some value")
    const [outputLoading, setOutputLoading] = useState(false)
  
    useEffect(() => {
      async function fetchCurrencies() {
        try {
          initialLoaderSetter(true)
          const res = await api.get("currencies")
          
          if(res.status < 200 || res.status >= 300) throw new Error("Something went wrong while fetching currencies.")
          
          const data: object = res.data
          const currArray = Object.keys(data)
          
          setCurrencies(currArray)
          setFrom(currArray[0])
          setTo(currArray[1])
        } catch(e) {
          console.log(e)
        } finally {
          initialLoaderSetter(false)
        }
      }
      fetchCurrencies()
    }, [initialLoaderSetter])
  
    useEffect(() => {
      const controller = new AbortController()

      async function fetchConversion() {
        try {
          setOutputLoading(true)
          const res = await api.get(`latest?amount=${value}&from=${from}&to=${to}`, {
            signal: controller.signal
          })
          
          if(res.status < 200 || res.status >= 300) throw new Error("Something went wrong while converting.")
  
          interface apiResp {
            amount: number
            base: string
            date: string
            rates: {
              to: number
            }
          }
          const data: apiResp = res.data
          
          setOutput(`${data.amount} ${data.base} = ${Object.values(data.rates)[0].toFixed(2)} ${Object.keys(data.rates)[0]}`)
        } catch(e) {
          console.log(e)
        } finally {
          setOutputLoading(false)
        }
      }
      if(value === 0) {
        setOutput("Type some value")
        return
      }
      fetchConversion()

      return function() {
        controller.abort()
      }
    }, [value, from, to])

    return (
        <>
            <div className="flex flex-wrap gap-3">
                <InputLabel name="from" label="From:"
                    extraClass="order-0 w-[calc(50%-6px)] sm:w-auto" 
                >
                    <Select 
                    name="from"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    options={currencies}
                    className="bg-slate-200 p-2 rounded-md"
                    disabledOption={to}
                    />
                </InputLabel>

                <InputLabel name="value" label="Value:" 
                    extraClass="order-2 w-full sm:order-1 sm:w-auto"
                >
                    <Input 
                    name="value"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className="bg-slate-200 p-2 rounded-md"
                    />
                </InputLabel>

                <InputLabel name="to" label="To:" 
                    extraClass="order-1 w-[calc(50%-6px)] sm:order-2 sm:w-auto"
                >
                    <Select 
                    name="to"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    options={currencies}
                    className="bg-slate-200 p-2 rounded-md"
                    disabledOption={from}
                    />
                </InputLabel>
            </div>
            
            <InputLabel name="output" label="Output:" 
                extraClass="relative"
            >
                <Input 
                    name="output"
                    value={output}
                    className={`bg-slate-200 p-2 rounded-md text-xl text-center ${outputLoading && "text-slate-300 relative"}`}
                    disabled={true}
                />
                {outputLoading && <InputLoader />}
            </InputLabel>
        </>
    )
}