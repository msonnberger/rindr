import { faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface SocialShareButtonProps {
  color: string
  textColor: string
  url: string
  text: string
  description: string
}
export default function SocialShareButton({
  color,
  textColor,
  url,
  text,
  description,
}: SocialShareButtonProps) {
  return (
    <a href={`${url}${text}`} className={`w-fit rounded-lg ${color} text-${textColor} p-2 transition ease-in-out delay-150 hover:scale-105 `}>
      {description}
      <FontAwesomeIcon icon={faShare} className="ml-2" />
    </a>
  )
}
