import { faAngleLeft, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { camelizeKeys } from '@utils/functions'
import { supabase } from '@utils/supabaseClient'
import { Sky } from '@styles/colors'
import AutoComplete from '@components/Autocomplete'
import Image from '@components/Image'
import Layout from '@components/Layout'

interface UserPreview {
  id: string
  firstName: string
  lastName: string
  pictureUrl: string | null
}

interface NewChatProps {
  users: UserPreview[]
  usersByFirstLetter: Record<string, UserPreview[]>
}

const NewChat: NextPage<NewChatProps> = ({ users, usersByFirstLetter }: NewChatProps) => {
  const [search, setSearch] = useState('')

  return (
    <>
      <Head>
        <title>New Chat</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <div className="flex flex-row items-center">
          <Link href="/chat" passHref>
            <FontAwesomeIcon
              icon={faAngleLeft}
              size="lg"
              color={Sky[400]}
              className="cursor-pointer absolute"
            />
          </Link>
          <p className="font-bold w-full text-center">New Message</p>
        </div>
        <div className="flex w-full h-14 flex-row rounded-3xl bg-sky-50 p-4 items-center mt-4 relative">
          <FontAwesomeIcon size="lg" icon={faMagnifyingGlass} color={Sky[400]} />
          <input
            placeholder="search user..."
            type="text"
            className="font-light ml-6 text-sky-800 bg-transparent outline-none"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          {search !== '' && (
            <AutoComplete
              options={users.filter((user) => {
                const name = `${user.firstName + user.lastName}`.toLowerCase()
                return name.includes(search.toLowerCase())
              })}
            />
          )}
        </div>

        <section className="mt-12 flex flex-col gap-4">
          {Object.keys(usersByFirstLetter).map((letter) => {
            return (
              <Fragment key={letter}>
                <p className="font-bold">{letter}</p>
                {usersByFirstLetter[letter].map((user) => {
                  return (
                    <Link key={user.id} href={`/new-chat/${user.id}`} passHref>
                      <div className="bg-sky-50 rounded-3xl h-16 flex flex-row items-center max-w-md w-full relative cursor-pointer">
                        <div className="mr-5 ml-5 h-12 w-12 rounded-full bg-emerald-300 relative">
                          {user.pictureUrl && (
                            <Image
                              src={user.pictureUrl}
                              alt="Profile picture"
                              className="rounded-full h-12 w-12 object-cover"
                            />
                          )}
                        </div>
                        <p>
                          {user.firstName} {user.lastName}
                        </p>
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
              </Fragment>
            )
          })}
        </section>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const user = { id: '4b824c28-6ac4-45ff-b175-56624c287706' }

  const { data: users, error } = await supabase
    .from('users')
    .select('id, first_name, last_name, picture_url')
    .not('id', 'eq', user.id)

  if (error) throw error
  if (!users) throw new Error('No users found.')

  const usersByFirstLetter = users.reduce((letterGroups, user) => {
    const letter = user.first_name[0].toUpperCase()

    return {
      ...letterGroups,
      [letter]: [...(letterGroups[letter] || []), camelizeKeys(user)],
    }
  }, {})

  return { props: { users: camelizeKeys(users), usersByFirstLetter } }
}

export default NewChat
