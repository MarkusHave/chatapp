import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Chat App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div class="join-container">
        <header class="join-header">
          <h1>
            <i class="fas fa-smile" /> ChatCord
          </h1>
        </header>
        <main class="join-main">
          <form action="chat.html">
            <div class="form-control">
              <label for="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter username..."
                required
              />
            </div>
            <div class="form-control">
              <label for="room">Room</label>
              <select name="room" id="room">
                <option value="Room 1">Room 1</option>
                <option value="Room 2">Room 2</option>
                <option value="Room 3">Room 3</option>
                <option value="Gaming">Gaming</option>
                <option value="Random">Random</option>
                <option value="Progamming">Progamming</option>
              </select>
            </div>
            <button type="submit" class="btn">
              Join Chat
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
