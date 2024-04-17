import { CaretDoubleLeft, 
    CaretDoubleRight, 
    CaretLeft, 
    CaretRight, 
    DotsThree, 
    MagnifyingGlass 
} from "phosphor-react"
import { IconButton } from "./icon-button"
import { Table } from "./table/table"
import { TableHeader } from "./table/table-header"
import { TableCell } from "./table/table-cell"
import { TableRow } from "./table/table-row"
import { ChangeEvent, useState } from "react"
import { attendees } from "../data/attendees"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/pt-br"

dayjs.extend(relativeTime)
dayjs.locale("pt-br")

export function AttendeeList() {
    const [ search, setSearch ] = useState('')
    const [ page, setPage ] = useState(1)

    const totalPages = Math.ceil(attendees.length / 10)

    function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
    }

    function goToNextPage() {
        setPage(page + 1)
    }

    function goPreviousPage() {
        setPage(page - 1)
    }

    function goToLastPage() {
        setPage(totalPages)
    }

    function goToFirstPage() {
        setPage(1)
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">
                    Participantes
                </h1>
                <div className="w-72 px-3 py-1.5 border border-white/10 rounded-lg text-xs flex items-center gap-3">
                    <MagnifyingGlass size={16} color="#6ee7b7" />
                    <input 
                        onChange={onSearchInputChanged}
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
                        {attendees.slice((page - 1) * 10, page * 10).map((attendee) => {
                            return (
                            <TableRow key={attendee.id}>
                                <TableCell>
                                    <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                                </TableCell>
                                <TableCell>{attendee.id}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-semibold text-white">{attendee.name}</span>
                                        <span>{attendee.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {dayjs().to(attendee.createAt)}
                                    </TableCell>
                                <TableCell>
                                    {dayjs().to(attendee.checkInAt)}
                                </TableCell>
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
                                Mostando 1 de {attendees.length} itens
                            </TableCell>
                            <TableCell colSpan={3} className="text-right">
                                <div className="inline-flex items-center gap-8">
                                    <span>Página {page} de {totalPages}</span>
                                    <div className="flex gap-1.5">
                                        <IconButton 
                                            onClick={goToFirstPage} 
                                            disabled={page === 1} 
                                            >
                                            <CaretDoubleLeft size={16} />
                                        </IconButton>
                                        <IconButton 
                                            onClick={goPreviousPage} 
                                            disabled={page === 1} 
                                            >
                                            <CaretLeft size={16} />
                                        </IconButton>
                                        <IconButton 
                                            onClick={goToNextPage} 
                                            disabled={page === totalPages} 
                                            >
                                            <CaretRight size={16} />
                                        </IconButton>
                                        <IconButton 
                                            onClick={goToLastPage} 
                                            disabled={page === totalPages}
                                            >
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