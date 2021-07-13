import ini from 'ini'
import { ConfigTemplate } from './ConfigTemplate.js'

export class IniConfig extends ConfigTemplate{
    _deserialize(data) {
        return ini.parse(data)
    }

    _serialize(data) {
        return ini.stringify(data)
    }
}