import { Component } from '@angular/core';
import { LutaServiceService } from '../service/LutaService/luta-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  public pokemonPrimeiraAba: any;
  public pokemonDesafiante: any;
  public vencedor: string = '';

  constructor(private lutaService: LutaServiceService, private http: HttpClient) {}

  procurarDesafiante() {
    this.pokemonPrimeiraAba = this.lutaService.getPokemon();

    if (!this.pokemonPrimeiraAba) {
      alert('Nenhum Pokémon foi selecionado na aba 1.');
      return;
    }

    const numero = Math.floor(Math.random() * 100) + 1;
    const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${numero}`;

    this.http.get(urlPokemon).subscribe(
      (data: any) => {
        this.pokemonDesafiante = data;

        // Agora que ambos os Pokémons estão carregados, compara as habilidades
        const habilidadesDesafiador = this.pokemonPrimeiraAba.abilities.length;
        const habilidadesDesafiante = this.pokemonDesafiante.abilities.length;

        if (habilidadesDesafiador > habilidadesDesafiante) {
          this.vencedor = `🏆 O vencedor foi o: ${this.pokemonPrimeiraAba.name}`;
        } else if (habilidadesDesafiador < habilidadesDesafiante) {
          this.vencedor = `🏆 O vencedor foi o: ${this.pokemonDesafiante.name}`;
        } else {
          this.vencedor = '⚔️ Empate!';
        }

      }, (error) => {
        console.log(error);
        alert("Pokémon não encontrado");
      }
    );
  }
}
