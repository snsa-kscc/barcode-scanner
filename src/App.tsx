import "./App.css";
import { useState, useEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

function App() {
  const [data, setData] = useState("Not Found");
  const [apiResponse, setApiResponse] = useState<any>(null);

  useEffect(() => {
    const fetchBarcodeData = async () => {
      if (data === "Not Found") {
        setApiResponse(null);
        return;
      }

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/ditto`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setApiResponse(jsonData);
      } catch (error) {
        console.error("Error fetching barcode data:", error);
        setApiResponse({ error: "Failed to fetch barcode data" });
      }
    };

    fetchBarcodeData();
  }, [data]);

  const handleFetchData = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/ditto`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      setApiResponse(jsonData);
    } catch (error) {
      console.error("Error fetching barcode data:", error);
      setApiResponse({ error: "Failed to fetch barcode data" });
    }
  };

  return (
    <>
      <BarcodeScannerComponent
        width={300}
        height={300}
        onUpdate={(_, result) => {
          if (result) {
            setData(result.getText());
          } else {
            setData("Not Found");
          }
        }}
      />
      <p>barcode: {data}</p>
      <button
        onClick={handleFetchData}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          margin: "20px 0",
          cursor: "pointer",
        }}
      >
        Fetch Barcode Data
      </button>
      {apiResponse && <pre style={{ maxWidth: "100%", overflow: "auto" }}>{JSON.stringify(apiResponse, null, 2)}</pre>}
    </>
  );
}

export default App;
