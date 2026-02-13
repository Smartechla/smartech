import { useEffect, useState } from "react"

export default ({reports, getReports})=>{

    const deleteReport = async (id) => {
        const res = await fetch(`/api/client/${id}`,{
            method: 'DELETE',
            headers: {'Content-type': 'application/json'}
        })
        const result = await res.json()
        getReports();
        alert(result.message);
    }
    return(<>
        <div className="nav">
            <h2>Nuestros Reportes</h2>
            <div className="container__report">
                {reports?.map(report=>(
                    <div key={report.id} className="report">
                        <h3>{report.text}</h3>
                        <div>
                            <button onClick={()=>deleteReport(report.id)}>borrar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    </>)

}