import Image from "next/image";
import Link from "next/link";
import cn from "@/utils/cn";
import { MdArrowForward } from "react-icons/md";

const LinkButton = ({ href = "/", text, Icon, children, className = '', ...props }) => {
    const transitionClasses = "transition-all ease-out duration-200";
    return (
        <Link href={href} className="group relative z-0 flex justify-between items-center pr-4" {...props}>
            <div className="flex items-center gap-4">
                <div className={cn("flex items-center justify-center size-14 bg-emerald-surface rounded-full border-2 border-emerald-surface  group-hover:bg-emerald group-hover:border-emerald", transitionClasses)}><Icon className="size-7" /></div>
                <p>{text}</p>
            </div>
            <div className={cn("absolute -z-10 inset-0 border-2 bg-transparent border-surface-2 rounded-full group-hover:border-surface-0 group-hover:bg-surface-0", transitionClasses)}></div>
            <MdArrowForward className="size-4 fill-content"/>
        </Link>
    )
}

export default LinkButton