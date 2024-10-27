import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="siz2-50 animate-spin" size={50}/>  
    </div>
  );
}