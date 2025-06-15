'use client'
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import styles from './styles.module.css';
import { getCategoryOptions } from "@/utils";
import { ChangeEvent, useState } from "react";
import { Button } from "@/app/_components/button";
import { Camera, Upload, Video } from "lucide-react";
import { CategoryProps } from "@/types/category.type";
import Dropdown from "@/app/(fatec)/_components/dropDown";
import { CourseLabels, LocationLabels, locationOptions, semesterOptions } from "@/utils/recordStatus";

interface CreateNewEventPageProps {
    categories: CategoryProps[];
}

export default function CreateNewEventPage({
    categories
}: CreateNewEventPageProps) {

    const [image, setImage] = useState<File>()
    const [previewImage, setPreviewImage] = useState<string>('')

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0]

            if (image.type !== 'image/jpeg' && image.type !== 'image/png') {
                toast.warning('Formato não permitido!')
                return
            }

            setImage(image)
            setPreviewImage(URL.createObjectURL(image))
        }
    }

    async function onSubmit(formData: FormData) {

    }

    return (
        <main className={styles.mainToCreateNewEvent}>
            <form action={onSubmit} className={styles.formToCreateNewEvent}>
                <h1>Criar um Evento</h1>

                <nav className={styles.navbarLink}>
                    <span>Informações</span>
                    <Link href={`participants`}>Participantes</Link>
                </nav>

                <div className={styles.uploadArea}>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        required={!previewImage}
                        onChange={handleFile}
                        className={styles.inputF}
                    />

                    {previewImage ?
                        (
                            <Image
                                alt="Imagem de preview"
                                src={previewImage}
                                className={styles.preview}
                                fill={true}
                                quality={100}
                                priority={true}
                            />
                        )
                        :
                        (
                            <>
                                <div className={styles.images}>
                                    <Camera size={25} />
                                    <span>|</span>
                                    <Video size={25} />
                                </div>
                                <p>Arraste e solte os arquivos</p>
                                <span className={styles.spanF}><Upload size={25} /><span>Upload</span></span>
                            </>
                        )
                    }
                </div>

                <div className={styles.grid}>
                    <input type="text" name="name" placeholder="Nome do Evento" required/>
                    <Dropdown name="categoria" defaultValue=""  options={getCategoryOptions(categories)}/>
                    <Dropdown name="Cursos" defaultValue=""  options={semesterOptions} />
                    <input placeholder="Semestre (opcional)"/>
                    <input placeholder="Limite de Inscrições" type="number" required/>
                    <Dropdown name="Localização" defaultValue="" options={locationOptions}/>
                    <input placeholder="Nome do Palestrante/Responsável" required/>
                    <input type="date" required/>
                    <input type="time" required/>
                    <input type="time" required/>
                </div>

                <textarea placeholder="Descrição do evento" />

                <div className={styles.buttonSubmit}>
                    <Button type="submit" name="Salvar" />
                </div>
            </form>
        </main>
    )
}