"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Search, FileText, Link } from "lucide-react"
import { useFormState } from "react-dom"
import { createSite } from '../../actions';
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import SiteCardContainer from "./_components/SiteCardContainer"

function Page() {
  const [state,action]= useFormState(createSite,null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [siteName, setSiteName] = useState("")
  const [subdomain, setSubdomain] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)
  const {user} = useUser()
  const router = useRouter()
  if(!user){
    router.push('/sign-in')
    return null
  }

  const handleSubmit = async (formData: FormData) => {
    await action(formData)
    setIsDialogOpen(false)
    setSiteName("")
    setSubdomain("")
    setRefreshKey(prevKey => prevKey + 1)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Websites</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Website
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Website</DialogTitle>
              <DialogDescription>
                Enter the details for your new website. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <form action={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-2">
                  <Label htmlFor="site-name" className="flex justify-center items-center gap-1">
                    <FileText className="h-4 w-4 inline-block" />
                    <p className="flex-1">Site Name</p>
                  </Label>
                  <Input
                    id="site-name"
                    name="site-name"
                    value={siteName}
                    type="text"
                    placeholder="My Website"
                    onChange={(e) => setSiteName(e.target.value)}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subdomain" className="flex justify-center items-center gap-1">
                    <Link className="h-5 w-5 inline-block" />
                    <p className="flex-1">Subdomain</p>
                  </Label>
                  <Input
                    id="subdomain"
                    value={subdomain}
                    name="subdomain"
                    type="text"
                    placeholder="my-site"
                    onChange={(e) => setSubdomain(e.target.value)}
                    className="col-span-3"
                    required
                  />
                </div>
                <input name="userId" hidden value={user.id} />
              </div>
              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mb-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search websites..." className="pl-8" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SiteCardContainer key={refreshKey} />
      </div>
    </main>
  )
}

export default Page
