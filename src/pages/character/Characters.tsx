import NavBar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { PlusSignFreeIcons } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Link } from "react-router";

export default function CharactersPage() {
    return <div className="flex h-screen">
        <div className="w-full p-8 flex flex-col">
            <NavBar />
            <div className="p-4 mt-2">
                <div className="flex gap-2 items-center">
                    <h3 className="text-foreground">Meus personagens</h3>
                    <Button size="icon-sm" asChild>
                        <Link to="/characters/new">
                            <HugeiconsIcon icon={PlusSignFreeIcons} />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    </div>
}