
import { defineStore } from 'pinia';
import axios from 'axios';


const BASE_URL = 'http://localhost:8080/api/v1/animals';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('admin:1234'),
  },
});

export const useAnimalStore = defineStore('animal', {
  state: () => ({
    animals: [],
    families: [],
    types: [],
    error: null,
    isLoading: false,
  }),
  actions: {
    async fetchAnimals() {
      this.isLoading = true;
      try {
        const response = await api.get('/all');
        this.animals = response.data;
      } catch (error) {
        this.error = 'Error fetching animals: ' + error.message;
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchFamilies() {
      this.isLoading = true;
      try {
        const response = await api.get('/families');
        this.families = response.data;
      } catch (error) {
        this.error = 'Error fetching families: ' + error.message;
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchTypes() {
      this.isLoading = true;
      try {
        const response = await api.get('/types');
        this.types = response.data;
      } catch (error) {
        this.error = 'Error fetching types: ' + error.message;
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },

    async addAnimal(newAnimal) {
      this.isLoading = true;
      try {
        await api.post('/add', newAnimal);
        this.fetchAnimals(); 
      } catch (error) {
        this.error = 'Error adding animal: ' + error.message;
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },

    async updateAnimal(id, updatedAnimal) {
      this.isLoading = true;
      try {
        await api.put(`/update/${id}`, updatedAnimal);
        this.fetchAnimals(); 
      } catch (error) {
        this.error = `Error updating animal with ID ${id}: ` + error.message;
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },

    async deleteAnimal(id) {
      this.isLoading = true;
      try {
        await api.delete(`/delete/${id}`);
        this.fetchAnimals(); 
      } catch (error) {
        this.error = `Error deleting animal with ID ${id}: ` + error.message;
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});

