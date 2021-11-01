import icons from 'url:../../img/icons.svg'; // Parcel 2
import noBookImg from 'url:../../img/no-book-cover-available.jpg'
export default class ResultsView{
    _parentEl = document.querySelector('.book-list')
 
    render(data) {
        this._data = data;
        const markup = this._generateMarkup();
        this._clear()
        this._parentEl.insertAdjacentHTML('afterbegin', markup);
    }

    addHandlerRender(handler){
        this._parentEl.addEventListener('click', (e) => {
            const bookItem = e.target.closest('.book-item')
            if(!bookItem) return
            const isbn = bookItem.dataset.isbn
            handler(isbn)
            
        })
        window.addEventListener('load',() => {
            handler()
        })
     }

    getIsbn(){
        return this._isbn
    }
 
    renderSpinner () {
        const markup = `
        <div class="spinner">
            <svg>
            <use href="${icons}#icon-loader"></use>
            </svg>
        </div>
        `;
        this._clear();
        this._parentEl.insertAdjacentHTML('afterbegin', markup);
    }

    _clear(){
        this._parentEl.innerHTML ='';
    }
    
    _generateMarkup() {
        if(this._data.length>0){
            return this._data
                .map(
                (book) => `
                <li class="book-item" data-isbn=${book.id}>
                    <div class="book-thumnail">
                        <img src="${book.imageUrl ? book.imageUrl : noBookImg}" alt="${book.title}" />
                    </div>
                    <div class="book-dsec">
                        <p class="title">${book.title.slice(0,10)}</p>
                        <p class="author">${book.authors[0]}</p>
                    </div>
                </li>
                `
                )
                .join('');
        }else{
            return '<h4 class="noResults__message"> ❌No results found for your search. try again <h1>';
        }
    }
}

export default new ResultsView()