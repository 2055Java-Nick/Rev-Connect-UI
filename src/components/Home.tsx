function Home() {
    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        localStorage.setItem('userId', e.target.value);
    }

    return (
        <>
            <div>Home</div>
            <div>
                <label htmlFor="userId">Temp User Id</label>
                <input type='text' id='userId' name='userId' onChange={onFormChange}></input>
            </div>
        </>
    )
}

export default Home