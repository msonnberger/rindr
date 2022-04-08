import { HomeIcon } from './icons/homeIcon'
import { ChatIcon } from './icons/chatIcon'
import { PigIcon } from './icons/pigIcon'
import { RidesCarIcon } from './icons/ridesCarIcon'
import { ProfileIcon } from './icons/profileIcon'
import { Slate } from '../styles/colors'

export default function Navbar() {
  return (
    <div className={"flex flex-row justify-evenly w-full bg-slate-50 h-16 rounded-3xl items-center"}>
      <HomeIcon color={Slate[300]}/>
      <ChatIcon color={Slate[300]}/>
      <PigIcon color={Slate[300]}/>
      <RidesCarIcon color={Slate[300]}/>
      <ProfileIcon color={Slate[300]}/>
    </div>
  )
}