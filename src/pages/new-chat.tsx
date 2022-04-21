import { faAngleLeft, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Channel, User } from '@utils/types'
import { db } from '@firebase-config'
import { Sky } from '@styles/colors'
import AutoComplete from '@components/autocomplete'
import Layout from '@components/layout'

const user: User = {
  name: 'Juliane',
  id: '1111',
}

interface UserAlphabet {
  letter: string
  users: User[]
}

const NewChat: NextPage = () => {
  const [users, setUsers] = useState<UserAlphabet[]>([])
  const [channels, setChannels] = useState<Channel[]>([])
  const [options, setOptions] = useState<User[]>([])
  const [search, setSearch] = useState('')
  const usersRef = collection(db, 'users')
  const channelRef = collection(db, 'channels')
  const usersQuery = query(usersRef)
  const channelQuery = query(channelRef, where('users', 'array-contains', user.id))

  const handleChange = (event: any) => {
    setSearch(event?.target.value)
    console.log(event?.target.value)
  }

  console.log(channels)

  useEffect(() => {
    onSnapshot(usersQuery, (querySnapshot) => {
      let newUsersAlphabet: UserAlphabet[] = []
      let newUsers: User[] = []
      querySnapshot.forEach((doc) => {
        if (user.id != doc.data().id) {
          let newUser = { name: doc.data().name, id: doc.data().id }
          newUsers.push(newUser)
          let userLetter = newUsersAlphabet.find((element: UserAlphabet) => element.letter == doc.data().name.charAt(0))
          if (userLetter != undefined) {
            userLetter.users.push(newUser)
          } else {
            newUsersAlphabet.push({ letter: doc.data().name.charAt(0), users: [newUser] })
          }
        }
      })
      newUsersAlphabet.sort((a, b) => (a.letter > b.letter ? 1 : -1))
      setOptions([...newUsers])
      setUsers([...newUsersAlphabet])
    })

    onSnapshot(channelQuery, (querySnapshot) => {
      let newChannels: Channel[] = []
      querySnapshot.forEach((doc) => {
        newChannels.push({ id: doc.id, users: doc.data().users })
      })
      setChannels([...newChannels])
    })
  }, [])

  return (
    <>
      <Head>
        <title>New Chat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex flex-row items-center">
          <Link href="/chat" passHref>
            <FontAwesomeIcon icon={faAngleLeft} size="lg" color={Sky[400]} className="cursor-pointer absolute" />
          </Link>
          <p className="font-bold w-full text-center">New Message</p>
        </div>
        <form
          onSubmit={() => {
            console.log('hallo')
          }}
          className="flex w-full h-14 flex-row rounded-3xl bg-sky-50 p-4 items-center mt-4 relative"
        >
          <FontAwesomeIcon size="lg" icon={faMagnifyingGlass} color={Sky[400]} />
          <input
            placeholder="search user..."
            type="text"
            className="font-light ml-6 text-sky-800 bg-transparent outline-none"
            value={search}
            onChange={handleChange}
          />
          {search != '' && (
            <AutoComplete options={options.filter((option) => option.name.toLowerCase().indexOf(`${search}`) != -1)} />
          )}
        </form>

        <section className="mt-12 flex flex-col gap-4">
          {users &&
            users.map((currentLetter: UserAlphabet) => {
              return (
                <>
                  <p key={currentLetter.letter} className="font-bold">
                    {currentLetter.letter}
                  </p>
                  {currentLetter.users.map((currentUser) => {
                    return (
                      <Link key={currentUser.id} href={`/chatroom/${currentUser.id}`} passHref>
                        <div className="bg-sky-50 rounded-3xl h-16 flex flex-row items-center max-w-md w-full relative cursor-pointer">
                          <div className="mr-5 ml-3 h-12 w-12 rounded-3xl bg-emerald-300"></div>
                          <p key={currentUser.id}>{currentUser.name}</p>
                          <FontAwesomeIcon
                            icon={faCommentDots}
                            size="lg"
                            color={Sky[500]}
                            className="absolute right-3.5"
                          />
                        </div>
                      </Link>
                    )
                  })}
                </>
              )
            })}
        </section>
      </Layout>
    </>
  )
}

export default NewChat
