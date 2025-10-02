import { useParams, useNavigate } from "react-router-dom";
import { destinations } from "./Home";
import { DestinationDetail } from "../components/DestinationDetail";

export default function DestinationPage(){
  const { id } = useParams();
  const navigate = useNavigate();
  const dest = destinations.find(d => d.id === id);
  if(!dest) return (
    <div className="container mx-auto px-4 py-16">Destination not found</div>
  );

  return <DestinationDetail destination={dest} onBack={() => navigate(-1)} />;
}
