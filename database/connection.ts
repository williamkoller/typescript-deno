import "https://deno.land/x/dotenv/mod.ts"
import { init, MongoClient } from "https://deno.land/x/mongo@v0.6.0/mod.ts"

await init();

const dataBase = Deno.env.get('DATABASE_NAME') || "deno"
const dataBaseURI = Deno.env.get('DATABASE_HOST') || "mongodb://localhost:27017"

class DataBase {
  public client: MongoClient
  constructor(
    public dataBase: string,
    public url: string
  ) {
    this.dataBase = dataBase
    this.url = url
    this.client = {} as MongoClient
  }
  
  connect() {
    const client = new MongoClient()
    client.connectWithUri(this.url)
    this.client = client
  }
  
  get findDataBase() {
    return this.client.database(this.dataBase)
  }
} 

const connection = new DataBase(dataBase, dataBaseURI)
connection.connect()

export default connection