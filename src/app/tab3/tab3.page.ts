import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  pokemons: any[] = [];
  limit = 9;
  offset = 0;
  totalPokemons = 1302;
  filtroNome: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${this.totalPokemons}`;
    this.http.get<any>(url).subscribe(response => {
      this.pokemons = response.results.map((pokemon: any) => {
        const id = pokemon.url.split('/').filter(Boolean).pop();
        return {
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        };
      });
    });
  }


  get pokemonsFiltrados() {
    if (!this.filtroNome) return this.pokemons;
    return this.pokemons.filter(p =>
      p.name.toLowerCase().includes(this.filtroNome.toLowerCase())
    );
  }
}
