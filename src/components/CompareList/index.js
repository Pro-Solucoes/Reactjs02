import React from 'react';
import PropTypes from 'prop-types';
import { Container, Repository } from './styles';

const CompareList = ({ repositorios }) => (
  <Container>
    {repositorios.map(repositorio => (
      <Repository key={repositorio.id}>
        <header>
          <img src={repositorio.owner.avatar_url} alt={repositorio.owner.login} />
          <strong>{repositorio.name}</strong>
          <small>{repositorio.owner.login}</small>
        </header>
        <ul>
          <li>
            {repositorio.stargazers_count}
            <small>star</small>
          </li>
          <li>
            {repositorio.forks_count}
            <small>forks</small>
          </li>
          <li>
            {repositorio.open_issues_count}
            <small>issues</small>
          </li>
          <li>
            {repositorio.lastCommit}
            <small>last commit</small>
          </li>
        </ul>
      </Repository>
    ))}
  </Container>
);

CompareList.protoType = {
  repositorios: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      nome: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string,
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      pushed_at: PropTypes.string,
    }).isRequired,
  ),
};

export default CompareList;
