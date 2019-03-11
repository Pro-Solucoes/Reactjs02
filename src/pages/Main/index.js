/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import Moment from 'moment';
import api from '../../sevices/api';
import logo from '../../assets/logo.png';
import { Container, Form } from './styles';
import CompareList from '../../components/CompareList';

export default class Main extends Component {
  state = {
    loading: false,
    repositorioErro: false,
    repositorioInput: '',
    repositorios: [],
  };

  handleAddRepositorio = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    try {
      const { data: repositorio } = await api.get(`repos/${this.state.repositorioInput}`);
      repositorio.lastCommit = Moment(repositorio.pushed_at).fromNow();

      this.setState({
        repositorioInput: '',
        repositorios: [...this.state.repositorios, repositorio],
        repositorioErro: false,
      });
    } catch (err) {
      this.setState({ repositorioErro: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <Container>
        <img src={logo} alt="Github" />
        <Form withError={this.state.repositorioErro} onSubmit={this.handleAddRepositorio}>
          <input
            type="text"
            placeholder="Usuario/Repositorio"
            value={this.state.repositorioInput}
            onChange={e => this.setState({ repositorioInput: e.target.value })}
          />
          <button type="submit">
            {this.state.loading ? <i className="fa fa-spinner fa-pluse" /> : 'OK'}
          </button>
        </Form>
        <CompareList repositorios={this.state.repositorios} />
      </Container>
    );
  }
}
