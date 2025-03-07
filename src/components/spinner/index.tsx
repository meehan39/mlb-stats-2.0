import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaseball } from '@fortawesome/free-solid-svg-icons';

export default function Spinner() {
  return (
    <div className='flex justify-center items-center w-full h-full'>
      <FontAwesomeIcon icon={faBaseball} className='animate-spin bg-red-600 w-14 h-14 rounded-full text-white opacity-50' />
    </div>
  )
}