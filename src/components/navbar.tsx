import { HomeIcon } from './icons/homeIcon'
import { ChatIcon } from './icons/chatIcon'
import { PigIcon } from './icons/pigIcon'
import { RidesCarIcon } from './icons/ridesCarIcon'
import { ProfileIcon } from './icons/profileIcon'
import { Emerald, Sky, Slate, Orange, Rose } from '../styles/colors'
import NavElement from './navElement'
import { useState } from 'react'
import { useRouter } from 'next/router'

const bgStylings = {
    Slate: 'flex flex-row justify-between bg-slate-300 h-10 rounded-3xl items-center px-3 gap-4',
    Sky: 'flex flex-row justify-between bg-sky-100 h-10 rounded-3xl items-center px-3 gap-4',
    Emerald: 'flex flex-row justify-between bg-emerald-100 h-10 rounded-3xl items-center px-3 gap-4',
    Orange: 'flex flex-row justify-between bg-orange-100 h-10 rounded-3xl items-center px-3 gap-4',
    Rose: 'flex flex-row justify-between bg-rose-100 h-10 rounded-3xl items-center px-3 gap-4',
  }

  const fgStylings = {
    Slate: 'text-slate-50 font-sans font-bold text-xs mr-3',
    Sky: 'text-sky-400 font-sans font-bold text-xs mr-3',
    Emerald: 'text-emerald-400 font-sans font-bold text-xs mr-3',
    Orange: 'text-orange-400 font-sans font-bold text-xs mr-3',
    Rose: 'text-rose-400 font-sans font-bold text-xs mr-3'
  }

export default function Navbar() {
  const router = useRouter()
  const [currentRoute, setRoute] = useState(router.pathname)
  
  
  return (
    <div className={"flex flex-row justify-evenly w-full bg-slate-50 h-16 rounded-3xl items-center"}>
      <NavElement title={"Home"} bgColor={bgStylings.Slate} fgColor={fgStylings.Slate} route={"/"} isActive={currentRoute === "/"}>
        <HomeIcon color={currentRoute === "/" ? Slate[50] : Slate[300]}/>
      </NavElement>
      <NavElement title={"Chat"} bgColor={bgStylings.Sky} fgColor={fgStylings.Sky} route={"/chat"} isActive={currentRoute === "/chat"}>
        <ChatIcon color={currentRoute === "/chat" ? Sky[400] : Slate[300]}/>
      </NavElement>
      <NavElement title={"Savings"} bgColor={bgStylings.Emerald} fgColor={fgStylings.Emerald} route={"/savings"} isActive={currentRoute === "/savings"}>
        <PigIcon color={currentRoute === "/savings" ? Emerald[400] : Slate[300]}/>
      </NavElement>
      <NavElement title={"Rides"} bgColor={bgStylings.Orange} fgColor={fgStylings.Orange} route={"/rides"} isActive={currentRoute === "/rides"}>
      <RidesCarIcon color={currentRoute === "/rides" ? Orange[400] : Slate[300]}/>
      </NavElement>
      <NavElement title={"Profile"} bgColor={bgStylings.Rose} fgColor={fgStylings.Rose} route={"/profile"} isActive={currentRoute === "/profile"}>
      <ProfileIcon color={currentRoute === "/profile" ? Rose[400] : Slate[300]}/>
      </NavElement>
    </div>
  )
}