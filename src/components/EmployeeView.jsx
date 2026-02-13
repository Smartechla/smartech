import { useState } from 'react';

export default () => {
    // Inicializamos el estado como un objeto vacío
    const [document, setDocument] = useState({});

    const handleFile = (e) => {
        try {
            const content = e.target.result;
            const json = JSON.parse(content);
            // Al setear el documento, React re-renderiza y rellena los inputs
            setDocument(json);
        } catch (err) {
            alert("Error: El archivo no tiene un formato JSON válido.");
        }
    };

    const readFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = handleFile;
            reader.readAsText(file);
        }
    };

    // Función para que puedas seguir escribiendo manualmente en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDocument({
            ...document,
            [name]: value
        });
    };

    return (
        <main>
            <h1>vista de trabajadores en progreso</h1>
            <input type="file" onChange={readFile} accept=".txt,.json" />

            <form method="post" className='form'>
                <label>
                    <p>nombre del usuario</p>
                    <input type="text" name="usuario" value={document.usuario || ''} onChange={handleChange} />
                </label>

                <label>
                    <p>nombre del pc</p>
                    <input type="text" name="pc" value={document.pc || ''} onChange={handleChange} />
                </label>

                <label>
                    <p>sistema operativo</p>
                    <input type="text" name="so" value={document.so || ''} onChange={handleChange} />
                </label>

                <label>
                    <p>tarjeta madre</p>
                    <input type="text" name="motherboard" value={document.motherboard || ''} onChange={handleChange} />
                </label>

                <label>
                    <p>almacenamiento</p>
                    <input type="text" name="almacenamiento" value={document.almacenamiento || ''} onChange={handleChange} />
                </label>

                <label>
                    <p>memoria ram</p>
                    <input type="text" name="ram" value={document.ram || ''} onChange={handleChange} />
                </label>

                <label>
                    <p>CPU</p>
                    <input type="text" name="cpu" value={document.cpu || ''} onChange={handleChange} />
                </label>

                <label>
                    <p>GPU</p>
                    <input type="text" name="gpu" value={document.gpu || ''} onChange={handleChange} />
                </label>

                <label>
                    <p>BIOS</p>
                    <input type="text" name="bios" value={document.bios || ''} onChange={handleChange} />
                </label>

                <label>
                    <p>FUENTE DE PODER</p>
                    <input type="text" name="fuente" value={document.fuente || ''} onChange={handleChange} />
                </label>

                <button type="submit">Enviar</button>
            </form>
        </main>
    );
}