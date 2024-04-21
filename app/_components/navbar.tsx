import { Menu } from "lucide-react"

export const NavBar=()=>{
    return(
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-[42px]">Acme</h1>
                <Menu size={18}/>
            </div>
        </div>
    )
}