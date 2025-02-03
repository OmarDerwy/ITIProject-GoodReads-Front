import { BookShelf } from "../components/general/BookShelf";

function General() {
    return (  <>
    <BookShelf /> {/*Pass "Recomended" title instead of "Bookshelf" */}

    <BookShelf /> {/*Pass "Trending today" title instead of "Bookshelf" */}

    <BookShelf /> {/*Pass "Latest books" title instead of "Bookshelf" */}


    </>);
}

export default General;