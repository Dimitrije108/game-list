
const libraries = [];

const collection = [];
libraries.push(collection);

const getLibraries = () =>  libraries;

const addLib = () => {
    const newLib = [];
    libraries.push(newLib);
};

const delLib = (lib) => {
    libraries.splice(lib, 1);
};

export { getLibraries, addLib, delLib };