import { useState } from "react"
import {
  FaChevronDown as IconChevronDown,
  FaChevronUp as IconChevronUp,
  FaSearch as IconSearch,
  FaCaretDown as IconSelector
} from "react-icons/fa"
import {
  Flex,
  Button,
  Center,
  Group,
  keys,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
  Modal,
  NativeSelect
} from "@mantine/core"
import classes from "../../styles/admin/TableSort.module.css"
import axiosInstance from "../../apis/config"
import { notifications } from '@mantine/notifications';
import { useDisclosure } from "@mantine/hooks"
import { useForm } from '@mantine/form';


function Th({ children, reversed, sorted, onSort }) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={16} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  )
}

function filterData(data, search) {
  const query = search.toLowerCase().trim()
  return data.filter(item =>{
    const filteredHeaders = keys(data[0]).filter((key)=> key != "__v")
    return filteredHeaders.some(key => item[key].toLowerCase().includes(query))
  })
}

function sortData(data, payload) {
  const { sortBy } = payload

  if (!sortBy) {
    return filterData(data, payload.search)
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy])
      }

      return a[sortBy].localeCompare(b[sortBy])
    }),
    payload.search
  )
}

// const data = [
//   {
//     name: "Athena Weissnat",
//     company: "Little - Rippin",
//     email: "Elouise.Prohaska@yahoo.com"
//   },
//   {
//     name: "Deangelo Runolfsson",
//     company: "Greenfelder - Krajcik",
//     email: "Kadin_Trantow87@yahoo.com"
//   },
//   {
//     name: "Danny Carter",
//     company: "Kohler and Sons",
//     email: "Marina3@hotmail.com"
//   },
//   {
//     name: "Trace Tremblay PhD",
//     company: "Crona, Aufderhar and Senger",
//     email: "Antonina.Pouros@yahoo.com"
//   },
//   {
//     name: "Derek Dibbert",
//     company: "Gottlieb LLC",
//     email: "Abagail29@hotmail.com"
//   },
//   {
//     name: "Viola Bernhard",
//     company: "Funk, Rohan and Kreiger",
//     email: "Jamie23@hotmail.com"
//   },
//   {
//     name: "Austin Jacobi",
//     company: "Botsford - Corwin",
//     email: "Genesis42@yahoo.com"
//   },
//   {
//     name: "Hershel Mosciski",
//     company: "Okuneva, Farrell and Kilback",
//     email: "Idella.Stehr28@yahoo.com"
//   },
//   {
//     name: "Mylene Ebert",
//     company: "Kirlin and Sons",
//     email: "Hildegard17@hotmail.com"
//   },
//   {
//     name: "Lou Trantow",
//     company: "Parisian - Lemke",
//     email: "Hillard.Barrows1@hotmail.com"
//   },
//   {
//     name: "Dariana Weimann",
//     company: "Schowalter - Donnelly",
//     email: "Colleen80@gmail.com"
//   },
//   {
//     name: "Dr. Christy Herman",
//     company: "VonRueden - Labadie",
//     email: "Lilyan98@gmail.com"
//   },
//   {
//     name: "Katelin Schuster",
//     company: "Jacobson - Smitham",
//     email: "Erich_Brekke76@gmail.com"
//   },
//   {
//     name: "Melyna Macejkovic",
//     company: "Schuster LLC",
//     email: "Kylee4@yahoo.com"
//   },
//   {
//     name: "Pinkie Rice",
//     company: "Wolf, Trantow and Zulauf",
//     email: "Fiona.Kutch@hotmail.com"
//   },
//   {
//     name: "Brain Kreiger",
//     company: "Lueilwitz Group",
//     email: "Rico98@hotmail.com"
//   }
// ]

export function TableSort(props) {
  const { dataHeader, handleNewData, currentApi } = props
  //states
  const [ data, setData] = useState(props.data)
  const [search, setSearch] = useState("")
  const [sortedData, setSortedData] = useState(() => sortData(data, { sortBy: null, reversed: false, search: "" }))
  const [sortBy, setSortBy] = useState(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)
  //CRUD states
  const [item, setItem] = useState(null)
  //disclosures
  const [deleteModalopened, {open: openDeleteModal,close: closeDeleteModal}] = useDisclosure(false);
  const [addModalopened, {open: openAddModal,close: closeAddModal}] = useDisclosure(false);
  const [editMode, {open: setEditMode, close: setAddMode}] = useDisclosure(false);
  //prepare form

  const dataHeaders = {
    Users: ["_id", "name", "email", "role"],
    Books: ["_id", "bookName", "authorName", "categoryName", "coverImage"]
  }

  const formUser = useForm({
    initialValues: {
      name: "dummy",
      email: "dummy1@example.com",
      password: "3465Tyhg",
      role: "user",
    },
  })
  const setSorting = field => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
    setSortedData(sortData(data, { sortBy: field, reversed, search }))
  }
console.log("does the code duplicate?")
  const handleSearchChange = event => {
    const { value } = event.currentTarget
    setSearch(value)
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    )
  }

  const handleApiDelete = () => {
    // console.log(row)
    axiosInstance.delete(`${currentApi}${item}`)
    .then((response) => {
      console.log(response)
      const newData = data.filter(item => item._id !== item)
      handleNewData(currentApi)
      notifications.show({
        title: 'Success',
        message: 'User deleted successfully.',
        color: 'green'
      })
    }).catch((error) => {
      console.log(error)
      notifications.show({
        title: 'error',
        message: 'There was an error with your request.',
        color: 'red'
      })
    });
  }

  const handleApiAdd = (values) => {
    console.log(values)
    console.log(item)
    if(editMode){
      axiosInstance.put(`${currentApi}${item}`, values)
      .then((response) => {
        console.log(response)
        handleNewData(currentApi)
        notifications.show({
          title: 'Success',
          message: 'User updated successfully.',
          color: 'green'
        })
      }).catch((error) => {
        console.log(error)
        notifications.show({
          title: 'error',
          message: 'There was an error with your request.',
          color: 'red'
        })
      });
    }
    else{
      axiosInstance.post(dataHeader? `/api/auth/register` : currentApi, values)
      .then((response) => {
        console.log(response)
        handleNewData(currentApi)
        notifications.show({
          title: 'Success',
          message: 'User added successfully.',
          color: 'green'
        })
      }).catch((error) => {
        console.log(error)
        notifications.show({
          title: 'error',
          message: 'There was an error with your request.',
          color: 'red'
        })
      });
    }
  }

  const rows = sortedData.map(row => (
    <Table.Tr key={row._id}>
      {dataHeaders[dataHeader].map((field, index) => (
        <Table.Td key={index}>{row[field]}</Table.Td>
      ))}
      <Table.Td>
        <Group spacing="sm">
          <Button size="xs" variant="outline" onClick={()=>{setItem(row._id);setEditMode();openAddModal();}}>Edit</Button>
          <Button size="xs" color="red" variant="outline" onClick={() => {setItem(row._id); openDeleteModal()}}>Delete</Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <>
      <Modal opened={addModalopened} onClose={closeAddModal} title="Add item" centered>
        <form onSubmit={formUser.onSubmit((values)=>{handleApiAdd(values)})}>
          <TextInput
            label="Name"
            placeholder="Input name"
            key={formUser.key('name')}
            {...formUser.getInputProps('name')}
          />
          <TextInput
            label="Email"
            placeholder="Input email"
            key={formUser.key('email')}
            {...formUser.getInputProps('email')}
          />
          { !editMode ? <TextInput
            label="Password"
            placeholder="Input password"
            key={formUser.key('password')}
            {...formUser.getInputProps('password')}
          />:null}
          <NativeSelect label="Role" data={['user', 'admin']} key={formUser.key('role')} {...formUser.getInputProps('role')}></NativeSelect>
          <Button type="submit" onClick={closeAddModal}>Add</Button>
          <Button onClick={closeAddModal}>Close</Button>
        </form>
      </Modal>
      <Modal opened={deleteModalopened} onClose={closeDeleteModal} title="Are you sure you want to delete this user?" centered>
        <Group>
          <Button onClick={()=>{handleApiDelete();closeDeleteModal();}}>Yes</Button>
          <Button onClick={closeDeleteModal}>No</Button>
        </Group>
      </Modal>
      <ScrollArea>
        <Flex gap={15} me={20}>
          <TextInput
            placeholder="Search by any field"
            mb="md"
            leftSection={<IconSearch size={16} stroke={1.5} />}
            value={search}
            onChange={handleSearchChange}
            flex={'1'}
          />
          <Button variant="outline" color="green" onClick={()=>{setAddMode();openAddModal();}}>Add Data</Button>
        </Flex>
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          miw={700}
          layout="fixed"
        >
          <Table.Tbody>
            <Table.Tr>
              {dataHeaders[dataHeader].map((field, index) => (
                <Th
                  key={field}
                  sorted={sortBy === field}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting(field)}
                >
                  {field.replace(/^_/, '')}
                </Th>
              ))}
            </Table.Tr>
          </Table.Tbody>
          <Table.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={4}>
                  <Text fw={500} ta="center">
                    Nothing found
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </>
  )
}
