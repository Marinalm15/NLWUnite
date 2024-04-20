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
import { ChangeEvent, useEffect, useState } from "react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/pt-br"

dayjs.extend(relativeTime)
dayjs.locale("pt-br")

interface Attendee {
    id: string
    name: string
    email: string
    checkedInAt: string | null
    createdAt: string
}

export function AttendeeList() {
    const [ search, setSearch ] = useState(() => {
        const url = new URL(window.location.toString())
        if(url.searchParams.has('search')) {
            return url.searchParams.get('search') ?? ''
        }
        return ''
    })
    const [ page, setPage ] = useState(() => {
        const url = new URL(window.location.toString())
        if(url.searchParams.has('page')) {
            return Number(url.searchParams.get('page'))
        }
        return 1
    })
    const [ attendees, setAttendees ] = useState<Attendee[]>([])
    const [ total, setTotal ] = useState(0)

    const totalPages = Math.ceil(total / 10)

    useEffect(() => {
        const url = new URL('http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees')

        url.searchParams.set('pageIndex', String(page -1))

        if(search.length > 0) {
            url.searchParams.set('query', search)
        }
        
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setAttendees(data.attendees)
            setTotal(data.total)
        })
    }, [page, search])

    function setCurrentPage(page: number) {
        const url = new URL(window.location.toString())
        url.searchParams.set('page', String(page))
        window.history.pushState({}, "", url)
        setPage(page)
    }

    function setCurrentSearch(search: string) {
        const url = new URL(window.location.toString()) 
        url.searchParams.set('search', search)
        window.history.pushState({}, "", url)
        setSearch(search)
    }

    function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
        setCurrentSearch(event.target.value)
        setCurrentPage(1)
    }

    function goToNextPage() {
        setCurrentPage(page + 1)
    }

    function goPreviousPage() {
        setCurrentPage(page - 1)
    }

    function goToLastPage() {
        setCurrentPage(totalPages)
    }

    function goToFirstPage() {
        setCurrentPage(1)
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
                        value={search}
                        placeholder="Buscar participante..."
                        className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-xs  focus:ring-0"
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
                        {attendees.map((attendee) => {
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
                                    {dayjs().to(attendee.createdAt)}
                                    </TableCell>
                                <TableCell>
                                    {attendee.checkedInAt === null 
                                    ? <span className="text-zinc-400">"Não fez chek-in" </span>
                                    : 
                                    dayjs().to(attendee.checkedInAt)}
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
                                Mostando {attendees.length} de {total} itens
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