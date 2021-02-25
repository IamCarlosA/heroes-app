import React, { useMemo } from 'react'
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {

    const location = useLocation();
    const { q = '' } = queryString.parse(location.search)

    const [values, handInputChange] = useForm({
        'input': q
    })
    const { input } = values;
    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);
    const handleSubmitInput = (e) => {
        e.preventDefault();
        history.push(`?q=${input}`);
    }

    return (
        <div>
            <h1>Search Hero</h1>
            <hr />
            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr />
                    <form onSubmit={handleSubmitInput}>
                        <input
                            name="input"
                            value={input}
                            onChange={handInputChange}
                            type="text"
                            autoComplete="off"
                            placeholder="Find your Hero"
                            className="form-control"
                        />
                        <button
                            type="submit"
                            className="btn btn-block btn-outline-primary mt-2"
                        >
                            search
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    <hr />
                    {
                        (q === '') ? <div className="alert alert-info">Search a Hero</div>
                            : (heroesFiltered.length === 0) ? <div className="alert alert-danger">there is no a hero with "{q}"</div>
                                : heroesFiltered.map(hero => (
                                    <HeroCard
                                        key={hero.id}
                                        {...hero}
                                    />
                                ))

                    }
                </div>
            </div>
        </div>
    )
}
