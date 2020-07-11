search = new Vue({
    el:'#api-vue',
    data:{
        searchInput:"",
		arraySearch:[],
    },
    methods:{
        searchAnimes: function () {
			var query = `query($search: String){
                Page{
                    media(search: $search, type: ANIME){
                        title{
                            romaji
                            english
                            native
                        }
                        description
                        coverImage{
                            large
                        }
                        episodes
                        averageScore
                        genres
                        source
                        bannerImage
                    }
                }
            }`;
			variables = {
				search: this.searchInput,   
			};
            console.log("funcion")
			$.ajax({
				url: "https://graphql.anilist.co",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				data: JSON.stringify({
					query: query,
					variables: variables,
				}),
				success: (reponse) => {
					this.handleResponse(reponse);
				},
			});
		},
		
        handleResponse: function (response) {
			if (this.arraySearch.length>0){
				this.arraySearch=[]
			}
			console.log(response.data.Page);
			response.data.Page.media.forEach((a) => {
				if (
					(a.title.english != null && a.title.english.toUpperCase().includes(this.searchInput.toUpperCase())) ||
					(a.title.romaji != null && a.title.romaji.toUpperCase().includes(this.searchInput.toUpperCase()))
				) {
					this.arraySearch.push(a);
				}
			});
			console.log(this.arraySearch);
        },
    },
});