import {UserCredentialsDataAccess} from "../../../app/server-app/data/user-credentials-data-access";
import {DataBase} from "../../../app/server-app/data/data-base";
import {Account} from "../../../app/server-app/model/auth-model";

const insertMock = jest.fn();
const getByMock = jest.fn();
jest.mock('../../../app/server-app/data/data-base', () => {
    return {
        DataBase : jest.fn().mockImplementation(()=>{
            return {
                insert: insertMock,
                getBy: getByMock
            }
        })
    }
})



describe('UserCredentialsDataAccess test suite', () => {
    let sut: UserCredentialsDataAccess;

    const someAccount: Account = {
        id: '',
        password: 'somePassword',
        userName: 'someUserName'
    }

    // const someAccount2: Account = {
    //     id: '',
    //     password: 'somePassword2',
    //     userName: 'someUserName2'
    // }

    const someId = '12345';

    beforeEach(() => {
        sut = new UserCredentialsDataAccess();
        expect(DataBase).toHaveBeenCalledTimes(1);
    });

    afterEach(()=>{
        jest.clearAllMocks();
    });

    it('should add user and return the id', async ()=>{
        insertMock.mockResolvedValueOnce(someId);

        const actualId = await sut.addUser(someAccount);

        expect(actualId).toBe(someId);
        expect(insertMock).toHaveBeenCalledWith(someAccount);
        // expect(insertMock).toHaveBeenCalledWith(someAccount2);
    });

    it('should get user by id', async ()=>{
        getByMock.mockResolvedValueOnce(someAccount);

        const actualUser = await sut.getUserById(someId);

        expect(actualUser).toEqual(someAccount)
        expect(getByMock).toHaveBeenCalledWith('id', someId);
    });

    it('should get user by name', async ()=>{
        getByMock.mockResolvedValueOnce(someAccount);

        const actualUser = await sut.getUserByUserName(someAccount.userName);

        expect(actualUser).toEqual(someAccount)
        expect(getByMock).toHaveBeenCalledWith('userName', someAccount.userName);
    });

});