class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=4b2b31254777ead455c55a5a150fdb39';

    getResource = async (url) => {
        let res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, status ${res.status}`);
            }
    
        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacters = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char, descriptionLength = 180) => {
        var characterDescription = '';
        if (char.description.length <= 0) {
            characterDescription = 'There\'s no desctription for this character yet';
        } else if (char.description.length > descriptionLength) {
            characterDescription = char.description.slice(0, descriptionLength-3)+'...';
        } else {
            characterDescription =char.description;
        }
        return {
            name: char.name,
            description: characterDescription,
            thumbnail: char.thumbnail.path + '.'+ char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
        }
    }
}

export default MarvelService