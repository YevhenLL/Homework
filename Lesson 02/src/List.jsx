import React, { useState, useEffect } from 'react';

const animals = [
  { type: 'turtle', icon: '🐢' },
  { type: 'octopus', icon: '🐙' },
  { type: 'fish', icon: '🐠' },
  { type: 'flamingo', icon: '🦩' },
  { type: 'penguin', icon: '🐧' }
];

const List = () => {
  const [list, setList] = useState(animals);

  useEffect(() => {
    const interval = setInterval(() => {
      const inactiveAnimals = list.filter(animal => !animal.active);
      if (inactiveAnimals.length === 0) {
        clearInterval(interval);
        return;
      }

      const randomIndex = Math.floor(Math.random() * inactiveAnimals.length);
      const updatedList = list.map(animal =>
        animal === inactiveAnimals[randomIndex] ? { ...animal, active: true } : animal
      );

      setList(updatedList);
    }, 1000);

    return () => clearInterval(interval);
  }, [list]);

  return (
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Icon</th>
        </tr>
      </thead>
      <tbody>
        {list.map((animal, index) => (
          <tr key={index} className={animal.active ? 'active' : ''}>
            <td>{animal.type}</td>
            <td>{animal.icon}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;