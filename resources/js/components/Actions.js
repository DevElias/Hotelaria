const actions = {
    sortByEstimated: (list) => {
        return list.sort((a, b) => new Date(b.estimated_at) - new Date(a.estimated_at));
    },
    formattedDate: (date) => {
        let dd = date.getDate();
        let mm = date.getMonth()+1;
        let yyyy = date.getFullYear();
        if(dd < 10) { dd = '0' + dd; }
        if(mm < 10) { mm = '0' + mm; }
        return `${yyyy}-${mm}-${dd}`;
    },
    addInList: (list, newItem) => {
        list.push(newItem);
        return actions.sortByEstimated(list);
    },
    updateInList: (list, newItem, fields) => {
        list.map(item => {
            if (item.id === newItem.id) {
                for (let i = 0; i < fields.length; i++) {
                    let field = fields[i];
                    item[field] = newItem[field];
                }
            }
        });
        return actions.sortByEstimated(list);
    },
    removeInList: (id, list) => list.filter(list => list.id !== id),
}

export default actions;
