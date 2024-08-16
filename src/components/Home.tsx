function Home() {
    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        localStorage.setItem('tempUserId', e.target.value);
    }

    return (
        <>
            <div>Home</div>
            <div>
                <label htmlFor="tempUserId">Temp User Id</label>
                <input type='text' id='tempUserId' name='tempUserId' onChange={onFormChange}></input>
            </div>
        </>
    )
}

export default Home