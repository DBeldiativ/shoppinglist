import React, { useState } from 'react';
import ItemAddForm from './ItemAddForm';

const ShoppingListDetail = ({
    listData,
    handleAddItem,
    handleRemoveItem,
    handleToggleItem,
    handleEditName,
    handleDeleteList,
    handleAddMember,
    handleRemoveMember,
}) => {
    const [newMember, setNewMember] = useState("");
    const [newName, setNewName] = useState("");
    const [filter, setFilter] = useState("all"); // Stav pro filtraci položek

    const handleMemberChange = (e) => {
        setNewMember(e.target.value);
    };

    const handleMemberSubmit = (e) => {
        e.preventDefault();
        if (newMember.trim()) {
            handleAddMember(newMember);
            setNewMember(""); // Reset the input field after submission
        }
    };

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newName.trim()) {
            handleEditName(newName);
            setNewName(""); // Reset the input field after submission
        }
    };

    // Funkce pro změnu filtru
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    return (
        <div>
            <h1>{listData.name}</h1>
            <button onClick={handleDeleteList}>Smazat seznam</button> {/* Přidáno tlačítko */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newName}
                    onChange={handleNameChange}
                    placeholder="Nový název seznamu"
                />
                <button type="submit">Uložit</button>
            </form>

            {/* Zobraz seznam položek */}
            <h2>Položky</h2>
            <label>
                Filtruj položky:
                <select value={filter} onChange={handleFilterChange}>
                    <option value="all">Vše</option>
                    <option value="unresolved">Nevyřešené</option>
                </select>
            </label>
            <ul>
                {listData.items
                    .filter(item => 
                        filter === "unresolved" ? !item.isResolved : true
                    )
                    .map(item => (
                        <li key={item.id}>
                            {item.name} {item.isResolved ? '(vyřešeno)' : ''}
                            <button onClick={() => handleToggleItem(item.id)}>Toggle</button>
                            <button onClick={() => handleRemoveItem(item.id)}>Odstranit</button>
                        </li>
                    ))}
            </ul>

            {/* Přidej formulář pro přidání položky */}
            <ItemAddForm handleAdd={handleAddItem} />

            {/* Zobraz členy */}
            <h2>Členové</h2>
            <ul>
                {listData.members.map((member, index) => (
                    <li key={index}>
                        {member}
                        <button onClick={() => handleRemoveMember(member)}>Odstranit člena</button>
                    </li>
                ))}
            </ul>

            {/* Tady přidej formulář pro přidání člena */}
            <h2>Přidat člena</h2>
            <form onSubmit={handleMemberSubmit}>
                <input
                    type="text"
                    value={newMember}
                    onChange={handleMemberChange}
                    placeholder="Jméno nového člena"
                />
                <button type="submit">Přidat člena</button>
            </form>
        </div>
    );
};

export default ShoppingListDetail;





