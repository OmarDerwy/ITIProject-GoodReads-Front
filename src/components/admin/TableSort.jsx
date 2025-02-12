import { AiOutlineClose } from "react-icons/ai"; 
import { useState, useRef, useCallback, useMemo, useEffect } from "react"
import {
  FaChevronDown as IconChevronDown,
  FaChevronUp as IconChevronUp,
  FaSearch as IconSearch,
  FaCaretDown as IconSelector
} from "react-icons/fa"
import { LuRefreshCcw } from "react-icons/lu";
import {
  ActionIcon,
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
    const filteredHeaders = keys(data[0]).filter((key)=> !['__v', 'clicked', 'averageRating', 'ratings', 'reviews', 'coverImage', 'bookFile', 'verified', 'books', 'imageUrl', 'category_covers' ].includes(key))
    return filteredHeaders.some(key => 
      {try {
        return item[key].toLowerCase().includes(query)
      } catch (error) {
        console.log(key)
      }}
    )
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
  const { dataHeader, handleNewData, currentApi, data } = props
  //states
  console.log(data)
  const [search, setSearch] = useState("")
  const [sortedData, setSortedData] = useState([])
  useEffect(() => {
    setSortedData(sortData(data, { sortBy: null, reversed: false, search: "" }))
  }, [data])
  // console.log(sortedData)
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
  //useRefs
  const searchRef = useRef(null);
  //singular item
  const singularItem={
    Users: 'user',
    Books: 'book',
    Authors: 'author',
    Categories: 'category'
  }

  //native functions
  const setSorting = field => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
    setSortedData(sortData(data, { sortBy: field, reversed, search }))
  }
  console.log("does the code duplicate?")

  const handleSearchChange = () => {
    const { value } = searchRef.current
    console.log(value)
    setSearch(value)
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    )
  }

  //config functions
  const dataHeaders = {
    Users: ["_id", "name", "email", "role", "avatar"],
    Books: ["_id", "bookName", "coverImage"],
    Authors: ["_id", "authorName", "dateOfBirth", "bio", 'avatar'],
    Categories: ["_id", "categoryName", "description", "coverImage"]
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
      authorId: null,
      categoryId: null,
      description: "This is a sample book description.",
      bookFile: null,
    },
  })

  const formAuthor = useForm({
    initialValues: {
      authorName: "Sample Author",
      dateOfBirth: "1990-01-01",
      bio: "This is a sample author bio.",
      avatar: null
    },
  })

  const formCategory = useForm({
    initialValues: {
      categoryName: "Sample Category",
      description: "This is a sample category description.",
      coverImage: null
    },
  })

  const [authorsArray, setAuthorsArray] = useState([]);
  const [categoriesArray, setCategoriesArray] = useState([]);
  
  useEffect(() => {
    const fetchAuthors = async () => {
      const response = await axiosInstance.get("/api/authors", {params:{noPagination: true }} );
      console.log(response.data.array)
      setAuthorsArray(response.data.array);
    };
    
    const fetchCategories = async () => {
      const response = await axiosInstance.get("/api/categories", {params:{noPagination: true }} );
      setCategoriesArray(response.data.array);
    };
    
    if (dataHeader === "Books") {
      fetchAuthors();
      fetchCategories();
    }
  }, [dataHeader]);

  useEffect(() => {
    if (dataHeader === "Books" && authorsArray.length > 0 && categoriesArray.length > 0) {
      formBook.setFieldValue('authorId', authorsArray[0]?._id);
      formBook.setFieldValue('categoryId', categoriesArray[0]?._id);
    }
  }, [authorsArray, categoriesArray, dataHeader]);

  // useEffect(() => {


  const handleApiDelete = () => {
    // console.log(row)
    axiosInstance.delete(`${currentApi}${item}`)
    .then((response) => {
      console.log(response)
      // const newData = data.filter(item => item._id !== item)
      handleNewData(currentApi)
      notifications.show({
        title: 'Success',
        message: `${singularItem[dataHeader].charAt(0).toUpperCase() + singularItem[dataHeader].slice(1)} deleted successfully.`,
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
      if (key == 'avatar' || key == 'coverImage'|| key == 'category_covers' || key == 'bookFile') {
        if(values[key] !== null){
          formData.append(key, values[key]);
        }
      } else {
        formData.append(key, values[key]);
      }
    }
    console.log(Array.from(formData));
    if(editMode){
      axiosInstance.put(`${currentApi}${item}`, formData)
      .then((response) => {
        console.log(response)
        handleNewData(currentApi)
        notifications.show({
          title: 'Success',
          message: `${singularItem[dataHeader].charAt(0).toUpperCase() + singularItem[dataHeader].slice(1)} updated successfully.`,
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
        formUser.reset();
        formBook.reset();
      });
    }
    else{
      axiosInstance.post(dataHeader == 'Users'? `/api/auth/registerInAdmin` : currentApi, formData)
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
        formUser.reset();
        formAuthor.reset();
        formBook.reset();
        formCategory.reset();
      });
    }
  }
  const rows = sortedData.map(row => (
    <Table.Tr key={row._id} style={{ maxHeight: '50px', overflow: 'hidden' }}>
      {dataHeaders[dataHeader].map((field, index) => (
        <Tooltip key={index} label={row[field]}>
          <Table.Td key={index} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {!row[field]? 'no data found' : ['avatar', 'coverImage', 'category_covers'].includes(field)? <Image onClick={()=>{setimageSrc(row[field]);openImageModal();}} src={row[field]} width={50} height={50} fit="contain" />: row[field]}
          </Table.Td>
        </Tooltip>
      ))}
      {dataHeader === 'Books' && row.authorId ? <Table.Td>{row.authorId.authorName}</Table.Td> : null}
      {dataHeader === 'Books' && row.categoryId ? <Table.Td>{row.categoryId.categoryName}</Table.Td> : null}
      <Table.Td>
        <Group spacing="sm">
          <Button size="xs" variant="outline" onClick={()=>{
            setItem(row._id);
            switch (dataHeader) {
              case 'Users':
                formUser.setValues({
                  name: row.name,
                  email: row.email,
                  password: row.password,
                  role: row.role,
                  avatar: null
                });
                break;
              case 'Books':
                formBook.setValues({
                  bookName: row.bookName,
                  authorName: row.authorName,
                  categoryName: row.categoryName,
                  description: row.description,
                  bookFile: null,
                });
                break;
              case 'Authors':
                formAuthor.setValues({
                  authorName: row.authorName,
                  dateOfBirth: row.dateOfBirth,
                  bio: row.bio,
                  avatar: null
                });
                break;
              case 'Categories':
                formCategory.setValues({
                  categoryName: row.categoryName,
                  description: row.description,
                  coverImage: null,
                });
                break;
            }
            // const formStuff = formUser.getValues()
            // for(const key in formStuff){
            //   // if (!['password', 'avatar', 'role'].includes(key)) {
            //   // }
            //   console.log(key, row[key])
            //   formUser.setFieldValue(key, row[key])
            // }
            // // .keys().forEach((key) => formUser.setFieldValue(key, row[key]));
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
      <Modal opened={addModalopened} onClose={closeAddModal} title={editMode? 'Edit ' + singularItem[dataHeader] : 'Add ' + singularItem[dataHeader]} centered>
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
                    label="Avatar"
                    description="Upload user's avatar here"
                    placeholder="Input image"
                    key={formUser.key('avatar')}
                    {...formUser.getInputProps('avatar')}
                  />
                  <Button type="submit" onClick={closeAddModal}>Add</Button>
                  <Button onClick={closeAddModal}>Close</Button>
                </form>
              )
            case 'Books':
              return (
                <form onSubmit={formBook.onSubmit((values)=>{
                  handleApiAdd(values)
                  })}>
                  <TextInput
                    label="Title"
                    placeholder="Input title"
                    key={formBook.key('bookName')}
                    {...formBook.getInputProps('bookName')}
                  />
                  <NativeSelect
                    label="Author"
                    placeholder="Input author"
                    data={authorsArray.map((author) => ({ label: author.authorName, value: author._id }))}
                    key={formBook.key('authorId')}
                    {...formBook.getInputProps('authorId')}
                  />
                  <TextInput
                    label="Description"
                    placeholder="Input description"
                    key={formBook.key('description')}
                    {...formBook.getInputProps('description')}
                  />
                  <NativeSelect
                    label="Category"
                    placeholder="Input category"
                    data={categoriesArray.map((category) => ({label: category.categoryName, value: category._id}))}
                    key={formBook.key('categoryId')}
                    {...formBook.getInputProps('categoryId')}
                  />
                  <FileInput
                    label="Book"
                    placeholder="Input book"
                    description="Upload book file here"
                    key={formBook.key('bookFile')}
                    {...formBook.getInputProps('bookFile')}
                  />
                  <Button type="submit" onClick={closeAddModal}>Add</Button>
                  <Button onClick={closeAddModal}>Close</Button>
                </form>
              )
            case 'Authors':
              return (
                <form onSubmit={formAuthor.onSubmit((values)=>{handleApiAdd(values)})}>
                  <TextInput
                    label="Name"
                    placeholder="Input name"
                    key={formAuthor.key('authorName')}
                    {...formAuthor.getInputProps('authorName')}
                  />
                  <TextInput
                    label="Description"
                    placeholder="Input description"
                    key={formAuthor.key('bio')}
                    {...formAuthor.getInputProps('bio')}
                  />
                  <FileInput
                    label="Image"
                    placeholder="Input image"
                    description="Upload author's avatar here"
                    key={formAuthor.key('avatar')}
                    {...formAuthor.getInputProps('avatar')}
                  />
                  <Button type="submit" onClick={closeAddModal}>Add</Button>
                  <Button onClick={closeAddModal}>Close</Button>
                </form>
              )
            case 'Categories':
              return (
                <form onSubmit={formCategory.onSubmit((values)=>{handleApiAdd(values)})}>
                  <TextInput
                    label="Name"
                    placeholder="Input name"
                    key={formCategory.key('categoryName')}
                    {...formCategory.getInputProps('categoryName')}
                  />
                  <TextInput
                    label="Description"
                    placeholder="Input description"
                    key={formCategory.key('description')}
                    {...formCategory.getInputProps('description')}
                  />
                  <FileInput
                    label="Image"
                    placeholder="Input image"
                    description="Upload category's image here"
                    key={formCategory.key('coverImage')}
                    {...formCategory.getInputProps('coverImage')}
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
      <Modal opened={deleteModalopened} onClose={closeDeleteModal} title={`Are you sure you want to delete this ${singularItem[dataHeader]}?`} centered>
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
            ref={searchRef}
            rightSection={
              search && (
                <ActionIcon
                  size={22}
                  variant="transparent"
                  onClick={() => {searchRef.current.value = '';handleSearchChange()}}
                >
                  <AiOutlineClose size={16} stroke={1.5} />
                </ActionIcon>
              )
            }
          />
          <Button variant="outline" color="green" onClick={()=>{setAddMode();openAddModal();}}>{'Add ' + singularItem[dataHeader]}</Button>
          <Button variant="outline" color="blue" onClick={()=>{handleNewData(currentApi)}}><LuRefreshCcw /></Button>
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
              {dataHeader === 'Books' && <><Th>Author</Th><Th>Category</Th></>}
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
