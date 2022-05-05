import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface ToggleButtonProps {
  text: string
  bgColor: string
  textColor?: string
  onClick?: () => void
  openend: boolean
  buttonColor?: string
}
export default function ToggleButton({
  text,
  bgColor,
  textColor,
  openend,
  onClick,
  buttonColor,
}: ToggleButtonProps) {
  return (
    <button
      className={`flex font-bold text-2xl mt-4 rounded-3xl py-2 pl-4 pr-4 w-fit-content min-w-[250px] ${bgColor} flex items-center justify-between gap-3`}
      onClick={onClick}
    >
      <p className={`${textColor}`}>{text}</p>
      {openend && <FontAwesomeIcon icon={faChevronUp} size="sm" color={buttonColor} />}
      {!openend && <FontAwesomeIcon icon={faChevronDown} size="sm" color={buttonColor} />}
    </button>
  )
}
