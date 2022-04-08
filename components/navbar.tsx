import { HomeIcon } from './icons/homeIcon'
import { ChatIcon } from './icons/chatIcon'
import { PigIcon } from './icons/pigIcon'
import { RidesCarIcon } from './icons/ridesCarIcon'
import { ProfileIcon } from './icons/profileIcon'
import { Emerald, Sky, Slate, Orange, Rose } from '../styles/colors'
import NavElement from './navElement'

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
  
  return (
    <div className={"flex flex-row justify-evenly w-full bg-slate-50 h-16 rounded-3xl items-center"}>
      <NavElement title={"Home"} bgColor={bgStylings.Slate} fgColor={fgStylings.Slate}>
        <HomeIcon color={Slate[50]}/>
      </NavElement>
      <NavElement title={"Chat"} bgColor={bgStylings.Sky} fgColor={fgStylings.Sky}>
        <ChatIcon color={Sky[400]}/>
      </NavElement>
      <NavElement title={"Savings"} bgColor={bgStylings.Emerald} fgColor={fgStylings.Emerald}>
        <PigIcon color={Emerald[400]}/>
      </NavElement>
      <NavElement title={"Rides"} bgColor={bgStylings.Orange} fgColor={fgStylings.Orange}>
      <RidesCarIcon color={Orange[400]}/>
      </NavElement>
      <NavElement title={"Profile"} bgColor={bgStylings.Rose} fgColor={fgStylings.Rose}>
      <ProfileIcon color={Rose[400]}/>
      </NavElement>
    </div>
  )
}