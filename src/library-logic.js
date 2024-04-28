
const libraries = [];

const collection = [];
libraries.push(collection);

const getLibraries = () =>  libraries;

const addLibArr = () => {
    const newLib = [];
    libraries.push(newLib);
};

const delLibArr = (lib) => {
    libraries.splice(lib, 1);
};

export { getLibraries, addLibArr, delLibArr };