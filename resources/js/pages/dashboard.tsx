import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Box, Button, Card, Flex, IconButton, Text, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {

    const [newsUpload, setNewsUpload] = useState({
        title: "",
        description: "",
        image_url: "",
        authors_id: "",
        categories: "",
    });

    const [updatedAuthorId, setUpdatedAuthorId] = useState('');

    const [authorsUpload, setAuthorsUpload] = useState({
        name: "",
        email: "",
        designation: "",
    })

    const [currentAuthors, setCurrentAuthors] = useState([]);

    const [showModal, setShowModal] = useState('none');

    const addAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const authors = authorsUpload;
        console.log(authors);
        axios.post('http://127.0.0.1:8000/api/authors', authors)
            .then(response =>
                console.log(response)
            );
    }

    const workOnAuthorUpdate = (id: string) => {
        setUpdatedAuthorId(id);
        setAuthorsUpload({name: currentAuthors[id-1].name, email: currentAuthors[id-1].email, designation: currentAuthors[id-1].designation})
        setShowModal('updateAuthors')
    }

    const updateAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const authors = authorsUpload;
        console.log(authors);
        axios.put(`http://127.0.0.1:8000/api/authors/${updatedAuthorId}`, authors)
            .then(response =>
                console.log(response)
            );
    }

    const deleteAuthor = (id:string) => {
        axios.delete(`http://127.0.0.1:8000/api/authors/${id}`)
    }

    const getVisibilityStatus = (e: string) => {
        setShowModal(e);
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/authors')
            .then(response => setCurrentAuthors(response.data));
    }, [addAuthor])



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">

                        <Flex gap="3">
                            <Button className='!cursor-pointer' color="crimson" variant="soft" onClick={() => setShowModal('updateNews')}>
                                Add News
                            </Button>
                        </Flex>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">

                        <Flex gap="3">
                            <Button className='!cursor-pointer' color="crimson" variant="soft">
                                Add New
                            </Button>
                        </Flex>
                    </div>
                    <div className="relative aspect-video rounded-xl border border-sidebar-border/70 dark:border-sidebar-border  overflow-auto">

                        <Flex gap="3">
                            <Button className='!cursor-pointer' color="crimson" variant="soft" onClick={() => setShowModal('addAuthors')}>
                                Add New Authors
                            </Button>
                        </Flex>
                        <div className='flex flex-col w-full items-center px-2'>
                            {
                                currentAuthors.map(c => (
                                    <Box className='w-full py-1.5' key={c.id}>
                                        <Card className='!flex !items-center !justify-between'>
                                            <Flex gap="3" align="center">
                                                <Box>
                                                    <Text as="div" size="2" weight="bold">
                                                        {c.name}
                                                    </Text>
                                                    <Text as="div" size="2" color="gray">
                                                        {c.designation}
                                                    </Text>
                                                </Box>
                                            </Flex>
                                            <div className='flex items-center justify-center'>
                                                <IconButton onClick={() => workOnAuthorUpdate(c.id)}>
                                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                                </IconButton>
                                                <IconButton onClick={() => deleteAuthor(c.id)}>
                                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                                </IconButton>
                                            </div>
                                        </Card>
                                    </Box>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">

                    <Flex gap="3">
                        <Button className='!cursor-pointer' color="crimson" variant="soft">
                            Add New
                        </Button>
                    </Flex>
                </div>
            </div>

            <div className={`w-full h-screen flex items-center justify-center fixed ${showModal == 'addAuthors' ? 'block' : 'hidden'}`}>
                <div className='w-full h-full flex justify-center items-center'>
                    <form onSubmit={addAuthor} className='w-1/2 h-2/3 bg-black/50 backdrop-blur-3xl rounded-2xl p-10 flex justify-center items-center flex-col space-y-2'>
                        <h1>Add Authors</h1>
                        <Flex direction="column" gap="3" maxWidth="250px">
                            <TextField.Root color="red" variant="soft" placeholder="Author Name" onChange={(e) => setAuthorsUpload(prev => ({ ...prev, name: e.target.value }))} />
                            <TextField.Root color="red" variant="soft" placeholder="Author Email" onChange={(e) => setAuthorsUpload(prev => ({ ...prev, email: e.target.value }))} />
                            <TextField.Root color="red" variant="soft" placeholder="Author Designation" onChange={(e) => setAuthorsUpload(prev => ({ ...prev, designation: e.target.value }))} />
                            <Button color="crimson" variant="soft" type='submit'>
                                Submit
                            </Button>
                            <Button type='button' onClick={() => setShowModal('none')}>Close</Button>
                        </Flex>
                    </form>
                </div>
            </div>

            <div className={`w-full h-screen flex items-center justify-center fixed ${showModal == 'updateAuthors' ? 'block' : 'hidden'}`}>
                <div className='w-full h-full flex justify-center items-center'>
                    <form onSubmit={updateAuthor} className='w-1/2 h-2/3 bg-black/50 backdrop-blur-3xl rounded-2xl p-10 flex justify-center items-center flex-col space-y-2'>
                        <h1>Add Authors</h1>
                        <Flex direction="column" gap="3" maxWidth="250px">
                            <TextField.Root defaultValue={authorsUpload.name} color="red" variant="soft" placeholder="Author Name" onChange={(e) => setAuthorsUpload(prev => ({ ...prev, name: e.target.value }))} />
                            <TextField.Root defaultValue={authorsUpload.email} color="red" variant="soft" placeholder="Author Email" onChange={(e) => setAuthorsUpload(prev => ({ ...prev, email: e.target.value }))} />
                            <TextField.Root defaultValue={authorsUpload.designation} color="red" variant="soft" placeholder="Author Designation" onChange={(e) => setAuthorsUpload(prev => ({ ...prev, designation: e.target.value }))} />
                            <Button color="crimson" variant="soft" type='submit'>
                                Update
                            </Button>
                            <Button type='button' onClick={() => setShowModal('none')}>Close</Button>
                        </Flex>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};