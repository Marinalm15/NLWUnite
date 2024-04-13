import nlwIcon from "../assets/nlw-unite-icon.svg"

export function Header() {
    return (
        <div className="flex items-center gap-5 py-2">
            <img src={nlwIcon} />
        
            <nav className="flex items-center gap-5">
                <a href="" className="font-medium text-xs text-zinc-300">Eventos</a>
                <a href="" className="font-medium text-xs">Participantes</a>
            </nav>
        </div>
    )
}