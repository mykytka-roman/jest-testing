import {DataBase} from "../../../app/server-app/data/data-base";
import * as IdGenerator from '../../../app/server-app/data/id-generator';


type SomeTypeWithId = {
    id: string;
    name: string;
    color: string;
}

describe('DataBase test suite', () => {

    let sut: DataBase<SomeTypeWithId>;

    const fakeId = '12345';

    const mockObject1 = {
        id: '',
        name: 'test name 1',
        color: 'green'
    }

    const mockObject2 = {
        id: '',
        name: 'test name 2',
        color: 'green'
    }

    beforeEach(() => {
        sut = new DataBase<SomeTypeWithId>();
        jest.spyOn(IdGenerator, 'generateRandomId').mockReturnValue(fakeId);
    })



    it('should return id after inset', async ()=>{
        const actual = await sut.insert({
            name: 'test name',
            color: 'red',
        } as any);

        expect(actual).toBe(fakeId);
    });

    it('should return element after inset', async ()=>{
        const id = await sut.insert(mockObject1);
        const actual = await sut.getBy('id', id);

        expect(actual).toBe(mockObject1);
    });

    it('should find all elements with the same property', async ()=>{
        await sut.insert(mockObject1);
        await sut.insert(mockObject2);

        const expected = [mockObject1, mockObject2];

        const actual = await sut.findAllBy('color', 'green');

        expect(actual).toEqual(expected);
    });

    it('should change color on element', async () => {
        const id = await sut.insert(mockObject1);
        const expectedColor = 'red';

        await sut.update(id, 'color', expectedColor);
        const object= await sut.getBy('id', id);
        const actualColor = object.color;

        expect(actualColor).toBe(expectedColor);
    });

    it('should delete element', async () => {
        const id = await sut.insert(mockObject1);
        await sut.delete(id);

        const actual = await sut.getBy('id', id);

        expect(actual).toBeUndefined();
    });

    it('should get all elements', async () => {
        await sut.insert(mockObject1);
        await sut.insert(mockObject2);
        const expected = [mockObject1, mockObject2];

        const actual = await sut.getAllElements();

        expect(actual).toEqual(expected);
    });

});