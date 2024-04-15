import { CaretDoubleLeft, CaretDoubleRight, CaretLeft, CaretRight, DotsThree, MagnifyingGlass } from "phosphor-react";
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";

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

           
                <Table>
                    <thead>
                        <tr className="border-b border-white/10 text-left">
                            <TableHeader style={{ width: 48}}>
                                <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                            </TableHeader>
                            <TableHeader>Código</TableHeader>
                            <TableHeader>Participantes</TableHeader>
                            <TableHeader>Data de inscrição</TableHeader>
                            <TableHeader>Dta do check-in</TableHeader>
                            <TableHeader style={{ width: 64}}></TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({length: 8}).map((_, index) => {
                            return (
                            <TableRow key={index}>
                                <TableCell>
                                    <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                                </TableCell>
                                <TableCell>85379488475</TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-semibold text-white">Marina Mendonça</span>
                                        <span>marinalm15@hotmail.com</span>
                                    </div>
                                </TableCell>
                                <TableCell>7 dias atrás</TableCell>
                                <TableCell>3 dias atrás</TableCell>
                                <TableCell>
                                    <IconButton transparent>
                                        <DotsThree size={16} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <TableRow>
                            <TableCell colSpan={3}>
                                Mostando 10 de 228 itens
                            </TableCell>
                            <TableCell colSpan={3} className="text-right">
                                <div className="inline-flex items-center gap-8">
                                    <span>Página 1 de 23</span>
                                    <div className="flex gap-1.5">
                                        <IconButton>
                                            <CaretDoubleLeft size={16} />
                                        </IconButton>
                                        <IconButton >
                                            <CaretLeft size={16} />
                                        </IconButton>
                                        <IconButton >
                                            <CaretRight size={16} />
                                        </IconButton>
                                        <IconButton >
                                            <CaretDoubleRight size={16} />
                                        </IconButton>
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
                    </tfoot>
                </Table>
        </div>
    )
}