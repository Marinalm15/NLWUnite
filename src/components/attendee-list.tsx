import { CaretDoubleLeft, CaretDoubleRight, CaretLeft, CaretRight, DotsThree, MagnifyingGlass } from "phosphor-react";

export function AttendeeList() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">
                    Participantes
                </h1>
                <div className="w-72 px-3 py-1.5 border border-white/10 rounded-lg text-xs flex items-center gap-3">
                    <MagnifyingGlass size={16} color="#6ee7b7" />
                    <input 
                        placeholder="Buscar participante..."
                        className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-xs"
                    />
                </div>
            </div>

            <div className=" border border-white/10 rounded-lg">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10 text-left">
                            <th style={{ width: 48}} className="py-3 px-4 text-sm font-semibold">
                                <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                            </th>
                            <th className="py-3 px-4 text-sm font-semibold">Código</th>
                            <th className="py-3 px-4 text-sm font-semibold">Participantes</th>
                            <th className="py-3 px-4 text-sm font-semibold">Data de inscrição</th>
                            <th className="py-3 px-4 text-sm font-semibold">Dta do check-in</th>
                            <th style={{ width: 64}} className="py-3 px-4 text-sm font-semibold"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({length: 8}).map((_, index) => {
                            return (
                            <tr key={index} className="text-left border-b border-white/10 hover:bg-white/5">
                                <td className="py-3 px-4 text-sm text-zinc-300">
                                    <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                                </td>
                                <td className="py-3 px-4 text-sm text-zinc-300">85379488475</td>
                                <td className="py-3 px-4 text-sm text-zinc-300">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-semibold text-white">Marina Mendonça</span>
                                        <span>marinalm15@hotmail.com</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-sm text-zinc-300">7 dias atrás</td>
                                <td className="py-3 px-4 text-sm text-zinc-300">3 dias atrás</td>
                                <td className="py-3 px-4 text-sm text-zinc-300">
                                    <button className="bg-black/20 border border-white/10 rounded-md p-1.5">
                                        <DotsThree size={16} />
                                    </button>
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3} className="py-3 px-4 text-sm text-zinc-300">
                                Mostando 10 de 228 itens
                            </td>
                            <td colSpan={3} className="py-3 px-4 text-sm text-zinc-300 text-right">
                                <div className="inline-flex items-center gap-8">
                                    <span>Página 1 de 23</span>
                                    <div className="flex gap-1.5">
                                        <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                                            <CaretDoubleLeft size={16} />
                                        </button>
                                        <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                                            <CaretLeft size={16} />
                                        </button>
                                        <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                                            <CaretRight size={16} />
                                        </button>
                                        <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                                            <CaretDoubleRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}