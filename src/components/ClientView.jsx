import { useEffect, useState } from "react"
import Nav from "./Nav"

export default () =>{
    const [reports, setReports] = useState([])
    const [description, setdescription] = useState('');

    useEffect(()=>{
        getReports()
    },[])

    const getReports = async()=>{
        const res = await fetch('/api/client')
        const data = await res.json()
        setReports(data)

    }

    const sendReport = async ()=>{
        if(description === ""){
            alert("explique el problema porfavor porfavor")
            return;
        }
        const res = await fetch('/api/client', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({description})
        })
        setdescription('')
        getReports()
        const result = await res.json();
        alert(result.message)
    }

    return(<main>
        <div className="form">
            <h1>Cuentanos el problema</h1>
            <form>
                <textarea onChange={e=>setdescription(e.target.value)}
                    value={description}
                    placeholder="ejemplo: no funciona la impresora de caja"
                ></textarea>
            </form>
            <button onClick={sendReport} className="button__report">Reportar</button>
        </div>
        {<Nav reports={reports} getReports={getReports}/>}
    </main>)
}