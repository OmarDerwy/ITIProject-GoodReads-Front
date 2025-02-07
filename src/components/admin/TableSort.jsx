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
  NativeSelect,
  Tooltip,
  FileInput,
  Image
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


export function TableSort(props) {
  const { dataHeader, handleNewData, currentApi } = props
  //states
  const [ data, setData] = useState(props.data)
  const [search, setSearch] = useState("")
  const [sortedData, setSortedData] = useState(() => sortData(data, { sortBy: null, reversed: false, search: "" }))
  const [sortBy, setSortBy] = useState(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)
  const [imageSrc, setimageSrc] = useState(null)
  //CRUD states
  const [item, setItem] = useState(null)
  //disclosures
  const [imageModalOpened, {open: openImageModal,close: closeImageModal}] = useDisclosure(false);
  const [deleteModalopened, {open: openDeleteModal,close: closeDeleteModal}] = useDisclosure(false);
  const [addModalopened, {open: openAddModal,close: closeAddModal}] = useDisclosure(false);
  const [editMode, {open: setEditMode, close: setAddMode}] = useDisclosure(false);
  //prepare form

  //native functions
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

  //config functions
  const dataHeaders = {
    Users: ["_id", "name", "email", "role", "avatar"],
    Books: ["_id", "bookName", "authorName", "categoryName", "coverImage"]
  }

  const formUser = useForm({
    initialValues: {
      name: "dummy",
      email: "dummy1@example.com",
      password: "3465Tyhg",
      role: "user",
      avatar: null
    },
  })

  const formBook = useForm({
    initialValues: {
      bookName: "Sample Book",
      authorName: "Sample Author",
      averageRating: 4.5,
      ratings: 100,
      categoryName: "Sample Category",
      description: "This is a sample book description.",
      coverImage: null,
    },
  })

  const handleApiDelete = () => {
    // console.log(row)
    axiosInstance.delete(`${currentApi}${item}`)
    .then((response) => {
      console.log(response)
      // const newData = data.filter(item => item._id !== item)
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
    // debugger;
    console.log(values)
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    console.log(Array.from(formData));
    if(editMode){
      axiosInstance.put(`${currentApi}${item}`, formData)
      .then((response) => {
        console.log(response)
        handleNewData(currentApi)
        notifications.show({
          title: 'Success',
          message: `${values.name} updated successfully.`,
          color: 'green'
        })
      }).catch((error) => {
        console.log(error)
        notifications.show({
          title: 'error',
          message: 'There was an error with your request.',
          color: 'red'
        })
      }).finally(() => {
        formUser.setValues({avatar: null})
      });
    }
    else{
      axiosInstance.post(dataHeader == 'Users'? `/api/auth/register` : currentApi, formData)
      .then((response) => {
        console.log(response)
        handleNewData(currentApi)
        notifications.show({
          title: 'Success',
          message: `${values.name} added successfully.`,
          color: 'green'
        })
      }).catch((error) => {
        console.log(error)
        notifications.show({
          title: 'error',
          message: 'There was an error with your request.',
          color: 'red'
        })
      }).finally(() => {
        formUser.setValues({avatar: null})
      });
    }
  }
  const rows = sortedData.map(row => (
    <Table.Tr key={row._id}>
      {dataHeaders[dataHeader].map((field, index) => (
        <Tooltip key={index} label={row[field]}>
          <Table.Td key={index} style={{ overflow: 'hidden' }}>
            {!row[field]? 'no data found' : ['avatar', 'coverImage'].includes(field)? <Image onClick={()=>{setimageSrc(row[field]);openImageModal();}} src={row[field]} width={50} height={50} fit="contain" />: row[field]}
          </Table.Td>
        </Tooltip>
      ))}
      <Table.Td>
        <Group spacing="sm">
          <Button size="xs" variant="outline" onClick={()=>{
            setItem(row._id);
            // formUser.setValues(row)
            const formStuff = formUser.getValues()
            for(const key in formStuff){
              // if (!['password', 'avatar', 'role'].includes(key)) {
              // }
              console.log(key, row[key])
              formUser.setFieldValue(key, row[key])
            }
            // .keys().forEach((key) => formUser.setFieldValue(key, row[key]));
            setEditMode();
            openAddModal();
            }}>
              Edit
            </Button>
          <Button size="xs" color="red" variant="outline" onClick={() => {setItem(row._id); openDeleteModal()}}>Delete</Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <>
      {/* EPIC MODALS */}
      <Modal opened={imageModalOpened} onClose={closeImageModal} centered>
        <Image src={imageSrc} width={500} height={500} fit="contain" />
      </Modal>
      <Modal opened={addModalopened} onClose={closeAddModal} title="Add item" centered>
        {(() => {
          switch (dataHeader) {
            case 'Users':
              return (
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
                  {<TextInput
                    label="Password"
                    placeholder="Input password"
                    key={formUser.key('password')}
                    {...formUser.getInputProps('password')}
                  />}
                  {<NativeSelect label="Role" data={['user', 'admin']} key={formUser.key('role')} {...formUser.getInputProps('role')}></NativeSelect>}
                  <FileInput
                    clearable
                    label="Input label"
                    description="Input description"
                    placeholder="Input placeholder"
                    key={formUser.key('avatar')}
                    {...formUser.getInputProps('avatar')}
                  />
                  <Button type="submit" onClick={closeAddModal}>Add</Button>
                  <Button onClick={closeAddModal}>Close</Button>
                </form>
              )
            case 'Books':
              return (
                <form onSubmit={formBook.onSubmit((values)=>{handleApiAdd(values)})}>
                  <TextInput
                    label="Title"
                    placeholder="Input title"
                    key={formBook.key('bookName')}
                    {...formBook.getInputProps('bookName')}
                  />
                  <TextInput
                    label="Author"
                    placeholder="Input author"
                    key={formBook.key('authorName')}
                    {...formBook.getInputProps('authorName')}
                  />
                  <TextInput
                    label="Description"
                    placeholder="Input description"
                    key={formBook.key('description')}
                    {...formBook.getInputProps('description')}
                  />
                  <TextInput
                    label="Category"
                    placeholder="Input category"
                    key={formBook.key('categoryName')}
                    {...formBook.getInputProps('categoryName')}
                  />
                  <TextInput
                    label="Image"
                    placeholder="Input Image"
                    key={formBook.key('coverImage')}
                    {...formBook.getInputProps('coverImage')}
                  />
                  <Button type="submit" onClick={closeAddModal}>Add</Button>
                  <Button onClick={closeAddModal}>Close</Button>
                </form>
              )
            default:
              return null
          }
        })()}
      </Modal>
      <Modal opened={deleteModalopened} onClose={closeDeleteModal} title="Are you sure you want to delete this user?" centered>
        <Group>
          <Button onClick={()=>{handleApiDelete();closeDeleteModal();}}>Yes</Button>
          <Button onClick={closeDeleteModal}>No</Button>
        </Group>
      </Modal>

      {/* END OF EPIC MODALS */}

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
