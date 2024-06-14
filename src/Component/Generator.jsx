import { useState } from 'react'
import './Generator.css'

export const Generator = () => {
const [img,setImg]=useState("");
const[loading,setLoading]=useState(false);
const [qrdata,setQrdata] = useState("");
const [qrSize,setQrsize] = useState(150);

  async function generateCode(){
    setLoading(true);
    try{
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${qrdata}`;
    setImg(url);

    }catch(error){
      console.log("Error Generating QR Code: "+error);
    }finally{
      setLoading(false)
    }
  }

  function downloadCode(){
    
    fetch(img)
    .then((response)=> response.blob())
    .then((blob)=>{
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "qrCode.png";
      document.body.appendChild(link);
      link.click()
      document.body.removeChild(link)
    });
  }
  return (
    <div className='app-Container'> 
    <h1>QR CODE GENERATOR</h1>
    {loading && <p>Please Wait...</p>}

    {/* If image exists then show otherwise dont */}

    {img && <img src={img} className='qr-code-image' ></img>}

    <div>
      
      <label htmlFor='dataInput' className='input-label'>Data for QR code:</label>

       <input type='text' id='dataInput' value={qrdata} onChange={(e)=>setQrdata(e.target.value)}></input>

       <label htmlFor='sizeInput' className='input-label'>Image Size (e.g., 150):</label>

       <input type='text' id='sizeInput' value={qrSize} onChange={(e)=>setQrsize(e.target.value)}></input>
       
       <button className='generate-button' disabled={loading} onClick={generateCode}>Generate QR Code</button>
       <button className='download-button' onClick={downloadCode}>Download QR Code</button>
    </div>
    <p className='footer'>Designed by <a href='#'>Jeeva</a></p>
    </div>
  )
}
